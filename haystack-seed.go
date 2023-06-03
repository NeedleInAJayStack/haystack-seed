package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/NeedleInAJayStack/haystack"
	"github.com/NeedleInAJayStack/haystack/client"
	"github.com/NeedleInAJayStack/haystack/io"
	"github.com/joho/godotenv"
)

func main() {
	client := startup()
	importFolioTrio("data/folio/alpha.trio", client)
	importFolioTrio("data/folio/bravo.trio", client)
	importFolioTrio("data/folio/charlie.trio", client)

	// importAllHis(client, []haystack.Date{})
	importAllHis(client, []haystack.Date{
		haystack.NewDate(2023, 6, 1),
		haystack.NewDate(2023, 6, 2),
		haystack.NewDate(2023, 6, 3),
		haystack.NewDate(2023, 6, 4),
		haystack.NewDate(2023, 6, 5),
		haystack.NewDate(2023, 6, 6),
		haystack.NewDate(2023, 6, 7),
		haystack.NewDate(2023, 6, 8),
	})

	// importHisZinc("data/his/a-076b.zinc", client)
}

// Start up a new client
func startup() *client.Client {
	err := godotenv.Load()
	if err != nil {
		panic("Error loading .env file")
	}

	client := client.NewClient(
		os.Getenv("HAYSTACK_URL"),
		os.Getenv("HAYSTACK_USERNAME"),
		os.Getenv("HAYSTACK_PASSWORD"),
	)
	openErr := client.Open()
	if openErr != nil {
		panic(openErr)
	}
	return client
}

// Import a trio file into the Folio database. Each row of the trio file is committed as a Folio record.
//
// Typically this only needs to be done once, as folio data is persistent.
//
// Currently, this requires the API to have `eval` support, but ideally would be adjusted to support any Haystack API.
func importFolioTrio(file string, client *client.Client) {
	fileBytes, readErr := os.ReadFile(file)
	if readErr != nil {
		panic(readErr)
	}
	fileZinc := haystack.NewStr(string(fileBytes)).ToZinc()
	fileZinc = strings.Replace(fileZinc, "$", "\\$", -1) // must escape dollar signs manually
	expr := "ioReadTrio(" + fileZinc + ").each(r => diff(null, r, {add}).commit())"
	fmt.Print(expr)
	result, evalErr := client.Eval(expr)
	if evalErr != nil {
		panic(evalErr)
	}
	fmt.Println(result.ToZinc())
}

func importAllHis(client *client.Client, dates []haystack.Date) {
	files, globErr := filepath.Glob("data/his/*.zinc")
	if globErr != nil {
		panic(globErr)
	}
	for _, file := range files {
		if len(dates) == 0 {
			importHisZinc(file, client, nil)
		} else {
			for _, date := range dates {
				importHisZinc(file, client, &date)
			}
		}
	}
}

// Import a zinc file into the history database. It is expected that the file name matches the point ID and that the
// zinc columns are "ts" and "his".
//
// The history database is purged whenever the process is stopped.
func importHisZinc(file string, client *client.Client, date *haystack.Date) {
	path := strings.Split(file, string(os.PathSeparator))
	nameWithExt := path[len(path)-1]
	name := strings.Split(nameWithExt, ".")[0]
	id := haystack.NewRef(name, "")

	fileBytes, fileErr := os.ReadFile(file)
	if fileErr != nil {
		panic(fileErr)
	}
	reader := io.ZincReader{}
	reader.InitString(string(fileBytes))
	val, zincErr := reader.ReadVal()
	if zincErr != nil {
		panic(zincErr)
	}

	var grid haystack.Grid
	switch val := val.(type) {
	case haystack.Grid:
		grid = val
	default:
		panic("Zinc file is not a grid: " + file)
	}

	if date != nil {
		grid = hisGridToDate(grid, *date)
	}

	hisItems := []haystack.Dict{}
	for _, row := range grid.Rows() {
		hisItems = append(hisItems, row.ToDict())
	}

	result, hisErr := client.HisWrite(id, hisItems)
	if hisErr != nil {
		panic(hisErr)
	}
	fmt.Println(result.ToZinc())
}

func hisGridToDate(grid haystack.Grid, date haystack.Date) haystack.Grid {
	builder := haystack.NewGridBuilder()
	builder.AddMetaDict(grid.Meta())
	for _, col := range grid.Cols() {
		builder.AddColDict(col.Name(), col.Meta())
	}
	for _, row := range grid.Rows() {
		ts := row.Get("ts").(haystack.DateTime)
		newTs := haystack.NewDateTime(date, ts.Time(), ts.TzOffset(), ts.Tz())

		builder.AddRow([]haystack.Val{newTs, row.Get("val")})
	}
	return builder.ToGrid()
}

// Query the folio database for the provided filter. Mainly used for testing.
func read(filter string, client *client.Client) {
	sites, readErr := client.Read(filter)
	if readErr != nil {
		panic(readErr)
	}
	fmt.Println(sites.ToZinc())
}

// Query the history database for the provided id and range. Mainly used for testing.
func readHis(id haystack.Ref, rangeString string, client *client.Client) {
	result, hisErr := client.HisRead(id, rangeString)
	if hisErr != nil {
		panic(hisErr)
	}
	fmt.Println(result.ToZinc())
}
