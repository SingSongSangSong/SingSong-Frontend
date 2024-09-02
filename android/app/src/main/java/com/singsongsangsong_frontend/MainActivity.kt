// package com.singsongsangsong_frontend

// import com.facebook.react.ReactActivity
// import com.facebook.react.ReactActivityDelegate
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
// import com.facebook.react.defaults.DefaultReactActivityDelegate
// import android.os.Bundle;
// import com.facebook.react.ReactrootView;

// class MainActivity : ReactActivity() {

//   /**
//    * Returns the name of the main component registered from JavaScript. This is used to schedule
//    * rendering of the component.
//    */
//   override fun getMainComponentName(): String = "singsongsangsong_frontend"

//   /**
//    * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
//    * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
//    */
//   override fun createReactActivityDelegate(): ReactActivityDelegate =
//       DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

//   override fun onCreate(savedInstanceState: Bundle?) {
//     super.onCreate(null)
//   }
// }

package com.singsongsangsong_frontend

import com.facebook.react.ReactActivity
// import com.facebook.react.ReactActivityDelegate
import com.facebook.react.ReactRootView
// import com.swmansion.gesturehandler.react.RNHandlerEnabledRootView
import android.os.Bundle

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String {
    return "singsongsangsong_frontend"
  }

/**
 * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
 * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
 */
// override fun createReactActivityDelegate(): ReactActivityDelegate {
//   return object : ReactActivityDelegate(this, getMainComponentName()) {
//     override fun createRootView(): ReactRootView {
//       return ReactRootView(this@MainActivity)
//     }
//   }
// }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
}
