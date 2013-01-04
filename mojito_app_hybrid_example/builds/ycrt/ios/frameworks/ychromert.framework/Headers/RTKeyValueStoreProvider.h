//
//  RTKeyValueStoreProvider.h
//  ychromert
//
//  Created by Anand Subba Rao on 3/21/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"

@class RTKeyValueStore;

@interface RTKeyValueStoreProvider : RTObject
- (RTKeyValueStore *)storeForNamespace:(NSString *)nameSpace;

// defaultsPath - path to directory has the default values for namespaces. Can be a readonly area
// customValuesPath - path to directory that can store values other than default. Has to be writable
- (id)initWithDefaultsPath:(NSString *)defaultsPath customValuesPath:(NSString *)customValuesPath;

//clear all custom values
- (void)reset;
@end
