#!/bin/sh

#  build.sh
#  template
#
#  Created by Srinivas Raovasudeva on 3/2/12.
#  Copyright (c) 2012 Yahoo! Inc. All rights reserved.

xcodebuild -project template-project/template.xcodeproj -target UploadTgz -configuration Release -sdk iphonesimulator clean build
