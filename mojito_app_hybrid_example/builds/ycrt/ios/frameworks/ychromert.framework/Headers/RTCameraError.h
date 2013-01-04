//
//  RTCameraError.h
//  ychromert
//
//  Errors for the camera service.
//
//  Created by Anne-lise Hassenklover on 4/3/12.
//  Copyright (c) 2012 Yahoo! Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RTError.h"



@interface RTCameraError : RTError
/** Camera Service Error Codes.
 */
typedef enum {
    kRTCameraErrorExternal              = -1, /** Some other service/error condition caused an error. */
    kRTCameraErrorUserCancelled         =  0, /**< The user cancelled camera or picker. */
    kRTCameraErrorInvalidSource         =  1, /**< sourceType is invalid or not present on device. */
    kRTCameraErrorInvalidDevice         =  2, /**< cameraType is invalid or not present on device. */
    kRTCameraErrorInvalidDestination    =  3, /**< destinationType is either invalid or unsupported. */
    kRTCameraErrorInvalidMediaType      =  4, /**< mediaType is not available. */
    kRTCameraErrorFailedToSaveImage     =  5, /**< Failed to save picked image. */
    kRTCameraErrorBusy                  =  6, /**< Camera / photo picker already being displayed. */
    kRTCameraErrorCancelCameraNotInUse  =  7, /**< cancelCamera called and no camera was up. */
    kRTCameraErrorPhotoPickerNotInUse   =  8, /**< cancelPhotoPicker called and no photo picker was up. */
} RTCameraErrorCode;

@end
