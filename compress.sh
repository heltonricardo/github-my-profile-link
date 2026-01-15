#!/usr/bin/env bash

sourceFolder="./extension"
destinationZip="./extension.zip"

[ -f "$destinationZip" ] && rm -f "$destinationZip"

cd "$sourceFolder" && zip -r "../$(basename "$destinationZip")" .
