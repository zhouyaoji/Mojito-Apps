//
//  RTCameraService.h
//  ychromert
//
//  Created by Anne-lise Hassenklover on 3/27/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTService.h"


@protocol RTViewControllerDelegate;

@interface RTCameraService : RTService

- (id)initWithViewControllerDelegate:(id<RTViewControllerDelegate>)viewControllerDelegate;

@end
