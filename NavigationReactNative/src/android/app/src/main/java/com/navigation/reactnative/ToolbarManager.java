package com.navigation.reactnative;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.google.android.material.appbar.AppBarLayout;

import javax.annotation.Nonnull;

public class ToolbarManager extends ViewGroupManager<ToolbarView> {

    @Nonnull
    @Override
    public String getName() {
        return "NVToolbar";
    }

    @Nonnull
    @Override
    protected ToolbarView createViewInstance(@Nonnull ThemedReactContext reactContext) {
        return new ToolbarView(reactContext);
    }

    @ReactProp(name = "title")
    public void setTitle(ToolbarView view, @Nullable String title) {
        view.setTitle(title);
    }

    @ReactProp(name = "logo")
    public void setLogo(ToolbarView view, @Nullable ReadableMap logo) {
        view.setLogoSource(logo);
    }

    @ReactProp(name = "navigationImage")
    public void setNavIcon(ToolbarView view, @Nullable ReadableMap navIcon) {
        view.setNavIconSource(navIcon);
    }

    @ReactProp(name = "overflowImage")
    public void setOverflowIcon(ToolbarView view, @Nullable ReadableMap overflowIcon) {
        view.setOverflowIconSource(overflowIcon);
    }

    @ReactProp(name = "menuItems")
    public void setMenuItems(ToolbarView view, @Nullable ReadableArray menuItems) {
        view.setMenuItems(menuItems);
    }

    @ReactProp(name = "barTintColor", customType = "Color")
    public void setBarTintColor(ToolbarView view, @Nullable Integer barTintColor) {
        if (barTintColor != null)
            view.setBackgroundColor(barTintColor);
        else
            view.setBackground(null);
    }

    @ReactProp(name = "tintColor", customType = "Color")
    public void setTintColor(ToolbarView view, @Nullable Integer tintColor) {
        view.setTintColor(tintColor);
    }

    @ReactProp(name = "titleColor", customType = "Color")
    public void setTitleColor(ToolbarView view, @Nullable Integer textColor) {
        view.setTitleTextColor(textColor != null ? textColor : view.defaultTitleTextColor);
    }

    @ReactProp(name = "scrollFlags")
    public void setScrollFlags(ToolbarView view, int scrollFlags) {
        ((AppBarLayout.LayoutParams) view.getLayoutParams()).setScrollFlags(scrollFlags);
    }
}