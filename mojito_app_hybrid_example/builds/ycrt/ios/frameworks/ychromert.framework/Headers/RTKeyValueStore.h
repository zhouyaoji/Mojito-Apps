//
//  RTKeyValueStore.h
//  ychromert
//
//  Created by Anand Subba Rao on 3/21/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTObject.h"

@interface RTKeyValueStore : RTObject
- (void)setObject:(id)obj forKey:(NSString *)key;
- (id)valueForKey:(NSString *)key;
- (void)removeObjectForKey:(NSString *)key;
- (BOOL)synchronize;
@end
