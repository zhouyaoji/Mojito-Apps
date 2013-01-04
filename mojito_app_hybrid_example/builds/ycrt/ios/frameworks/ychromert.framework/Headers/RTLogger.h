//
//  RTLogger.h
//  ychromert
//
//  Created by Srinivas Raovasudeva on 2/15/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@protocol RTLogger <NSObject>

- (void)log:(NSString *)component severity:(NSString *)severity timeStamp:(NSDate *)timeStamp message:(NSString *)message;

@end
