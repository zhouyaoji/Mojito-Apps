//
//  RTNullContext.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/14/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTContext.h"
#import "RTContextIDGenerator.h"
@interface RTNullContext : RTContext

- (id) initWithContextIDGenerator:(Class<RTContextIDGenerator>)contextIDGenerator;
#pragma mark - contextID management
//
// Get a generated contextID.
//
- (NSString *)generateContextID;
@end
