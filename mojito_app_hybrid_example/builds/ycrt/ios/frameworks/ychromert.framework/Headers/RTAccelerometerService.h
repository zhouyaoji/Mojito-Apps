//
//  RTAccelerometerService.h
//  ychromert
//
//  Created by Aishvarya Pedgaonkar on 2/23/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTService.h"


@class CMMotionManager;

@interface RTAccelerometerService : RTService

typedef enum {
    RTAccelerometerServiceCallTypeContinuous = 0,
    RTAccelerometerServiceCallTypeOneShot
} RTAccelerometerServiceCallType;

- (id) initWithCoreMotionManager:(CMMotionManager *)motionManager;

@end
