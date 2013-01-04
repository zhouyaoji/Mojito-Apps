//
//  RTWebViewContext.h
//  ychromert
//
//  Created by Rongrong Zhong on 2/17/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import "RTContext.h"
#import "RTWebView.h"

@interface RTWebViewContext : RTContext <RTWebViewDelegate>

@property (nonatomic, retain) RTWebView *webView;
@property (nonatomic, readonly, getter = isWebViewLoaded) BOOL webViewLoaded;

- (id)initWithID:(NSString *)identifier parent:(RTContext *)parent mainQueue:(dispatch_queue_t)mainQueue;

@end
