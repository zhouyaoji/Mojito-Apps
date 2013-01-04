//
//  RTCompassService.h
//  ychromert
//
//  Created by Rongrong Zhong on 3/27/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTService.h"
#import <CoreLocation/CoreLocation.h>

@class RTCompassError;

@protocol RTCompassServiceDelegate
@required
- (void)updateHeading:(CLHeading *)heading;
- (void)failedWithError:(RTCompassError *)error;
@end

@class RTLocationManager;

@interface RTCompassService : RTService

- (id)initWithLocationManager:(RTLocationManager *)locationManager;
@end
