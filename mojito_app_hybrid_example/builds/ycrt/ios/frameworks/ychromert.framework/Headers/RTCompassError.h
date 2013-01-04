//
//  RTCompassError.h
//  ychromert
//
//  Created by Rongrong Zhong on 4/2/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RTError.h"


@interface RTCompassError : RTError
/** Compass Service Errors.
 */
typedef enum {
    kRTCompassErrorCodeOK = 0, /**< No Error */
    kRTCompassErrorServiceUnavailable, /**< Compass not available on device */
    kRTCompassErrorDenied, /**< User denied permission to use Compass */
    kRTCompassErrorCodeHeadingFailure, /**< Unable to get Heading */
    kRTCompassErrorUnknown /**< Unknown Error */
} RTCompassErrorCode;

//
// Create w/ NSError and User Info
//
+ (id)errorWithNSError:(NSError *)error userInfo:(NSDictionary *)dict;


//
// initialize w/ NSError and User Info
//
- (id)initWithNSError: (NSError *)error userInfo:(NSDictionary *)dict;

@end