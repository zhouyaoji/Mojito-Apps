package com.yahoo.platform.ychrome.activity;

import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.LinearLayout;

import com.yahoo.platform.mobile.ychromert.app.RTActivity;
import com.yahoo.platform.mobile.ychromert.app.RTWebView;

public class YChromeActivity extends RTActivity implements OnClickListener{
    private final static String TAG = "YChromeActivity";
    
    private final static int ID_BTN_NAVIGATE_BACK = 0x7001;
    private final static int ID_BTN_RELOAD = 0x7002;
    private final static int ID_BTN_NAVIGATE_FORWARD = 0x7003;
    
    private final static String STR_NAVIGATE_BACK = "Back";
    private final static String STR_RELOAD = "reload";
    private final static String STR_NAVIGATE_FORWARD = "Forward";
    
    private RTWebView mWebview;

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        LinearLayout mainLy = new LinearLayout(this);
        mainLy.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.FILL_PARENT,
                ViewGroup.LayoutParams.FILL_PARENT));
        mainLy.setOrientation(LinearLayout.VERTICAL);
        setContentView(mainLy);
        
        LinearLayout btnLy = new LinearLayout(this);
        btnLy.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.FILL_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));
        btnLy.setOrientation(LinearLayout.HORIZONTAL);
        
//        mainLy.addView(btnLy);
        
        Button btn = new Button(this);
        btn.setText(STR_NAVIGATE_BACK);
        btn.setId(ID_BTN_NAVIGATE_BACK);
        btn.setLayoutParams(new LinearLayout.LayoutParams( ViewGroup.LayoutParams.WRAP_CONTENT,  ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        btnLy.addView(btn);
        btn.setOnClickListener(this);
        
        btn = new Button(this);
        btn.setText(STR_RELOAD);
        btn.setId(ID_BTN_RELOAD);
        btn.setLayoutParams(new LinearLayout.LayoutParams( ViewGroup.LayoutParams.WRAP_CONTENT,  ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        btnLy.addView(btn);
        btn.setOnClickListener(this);
        
        btn = new Button(this);
        btn.setText(STR_NAVIGATE_FORWARD);
        btn.setId(ID_BTN_NAVIGATE_FORWARD);
        btn.setLayoutParams(new LinearLayout.LayoutParams( ViewGroup.LayoutParams.WRAP_CONTENT,  ViewGroup.LayoutParams.WRAP_CONTENT, 1));
        btnLy.addView(btn);
        btn.setOnClickListener(this);
        
        FrameLayout ly = new FrameLayout(this);
        ly.setLayoutParams(new ViewGroup.LayoutParams( ViewGroup.LayoutParams.FILL_PARENT,  ViewGroup.LayoutParams.MATCH_PARENT ) );
        mainLy.addView(ly);
        
        ViewGroup.LayoutParams lyParams = new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.FILL_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);
        
        mWebview = createRTWebView(ly, lyParams);
        mWebview.loadUrl("ychromert://yahoo.com/yahoo.application.mojito_app_hybrid_example/index.html");
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
        case ID_BTN_NAVIGATE_BACK:
            mWebview.goBackOrForward(-1);
            break;
        
        case ID_BTN_RELOAD:
            mWebview.reload();
            break;
            
        case ID_BTN_NAVIGATE_FORWARD:
            mWebview.goBackOrForward(1);
            break;
        }
    }
}
