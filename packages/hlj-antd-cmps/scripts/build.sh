#!/bin/bash

# clean
rm -rf lib


# build umd output
cross-env NODE_ENV=production webpack --progress

