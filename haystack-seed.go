package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/NeedleInAJayStack/haystack"
	"github.com/NeedleInAJayStack/haystack/client"
	"github.com/NeedleInAJayStack/haystack/io"
	"github.com/joho/godotenv"
)

func main() {
	client := startup()
	// importFolioTrio("data/folio/alpha.trio", client)
	importHisZinc("data/his/a-07bd.zinc", client)

	readHis(
		haystack.NewRef("a-07bd", ""),
		"today",
		client,
	)
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

// Import a zinc file into the history database. It is expected that the file name matches the point ID and that the
// zinc columns are "ts" and "his".
//
// The history database is purged whenever the process is stopped.
func importHisZinc(file string, client *client.Client) {
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
