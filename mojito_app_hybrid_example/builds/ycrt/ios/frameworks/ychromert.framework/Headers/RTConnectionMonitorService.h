//
//  RTConnectionMonitorService.h
//  ychromert
//
//  Created by Srinivas Raovasudeva on 4/2/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTService.h"

typedef enum {
    kRTConnectionUnknown = 0,
    kRTConnectionEthernet,
    kRTConnectionWifi,
    kRTConnectionCell2G,
    kRTConnectionCell3G,
    kRTConnectionCell4G,
    kRTConnectionNone
}RTConnectionType;

@interface RTConnectionMonitorService : RTService

- (id)initWithURL:(NSURL *)url;

-(void)connectionTypeWithBlock:(void (^)(RTConnectionType type))block;

@end
