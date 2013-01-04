//
//  RTGeoService.h
//  ychromert
//
//  Created by Clement Lau on 2/28/2012
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTService.h"

@class RTLocationManager;

//
// This class implements the platform specific logic to start and stop the native
// location service to determine the current location of the device.
//

@interface RTGeoService : RTService

//
// Required by RTService
// Pass nil for theGeoServiceInterface if not stubbing
// Recommended to initialize CLLocationManager in AppDelegate and inject it as theLocationManager
//

- (id)initWithLocationManager:(RTLocationManager *)locationManager;

@end
