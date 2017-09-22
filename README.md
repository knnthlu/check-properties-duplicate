# check-properties-duplicate
Return duplicate data in properties file

## Installation

`npm install check-properties-duplicate`

## How to use

Create a json config for source path and destination path.

Example:
**myconfig.json
```
{
    src: "c:\properties",
    dist: "c:\duplicate"
}
```

then run

`check-properties-duplicate -p myconfig.json`

## See sample below:

**myfile.properties
```
prop_hello = Hello
prop_hi = Hi
prop_hello = Ola
```

It will output:

**myfile.json
```
{
    "prop_hello": "Ola"
}
```