#import "NVSearchBarView.h"
#import "NVSearchResultsController.h"

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTTouchHandler.h>
#import <React/UIView+React.h>

@implementation NVSearchBarView
{
    __weak RCTBridge *_bridge;
    UISearchController *_searchController;
    RCTTouchHandler *_touchHandler;
    UIView *_reactSubview;
    __weak UINavigationItem *navigationItem;
    NSInteger _nativeEventCount;
}

- (id)initWithBridge:(RCTBridge *)bridge
{
    if (self = [super initWithFrame:CGRectZero]) {
        _bridge = bridge;
        NVSearchResultsController *viewController = [[NVSearchResultsController alloc] init];
        viewController.view = [UIView new];
        _searchController = [[UISearchController alloc] initWithSearchResultsController:viewController];
        _touchHandler = [[RCTTouchHandler alloc] initWithBridge:bridge];
        __weak typeof(self) weakSelf = self;
        viewController.boundsDidChangeBlock = ^(CGRect newBounds) {
            [weakSelf notifyForBoundsChange:newBounds];
        };
    }
    return self;
}

- (void)setObscureBackground:(BOOL)obscureBackground
{
    [_searchController setObscuresBackgroundDuringPresentation:obscureBackground];
}

- (void)setHideNavigationBar:(BOOL)hideNavigationBar
{
    [_searchController setHidesNavigationBarDuringPresentation:hideNavigationBar];
}

- (void)setAutoCapitalize:(UITextAutocapitalizationType)autoCapitalize
{
    [_searchController.searchBar setAutocapitalizationType:autoCapitalize];
}

- (void)setPlaceholder:(NSString *)placeholder
{
    [_searchController.searchBar setPlaceholder:placeholder];
}

- (void)setText:(NSString *)text
{
    NSInteger eventLag = _nativeEventCount - _mostRecentEventCount;
    if (eventLag == 0 && [_searchController.searchBar text] != text) {
        [_searchController.searchBar setText:text];
    }
}

- (void)notifyForBoundsChange:(CGRect)newBounds
{
    if (_reactSubview) {
        [_bridge.uiManager setSize:newBounds.size forView:_reactSubview];
    }
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
    [super insertReactSubview:subview atIndex:atIndex];
    [_searchController.searchResultsController.view insertSubview:subview atIndex:0];
    [_touchHandler attachToView:subview];
    _reactSubview = subview;
}

- (void)didUpdateReactSubviews
{
}

- (void)didMoveToWindow
{
    [super didMoveToWindow];
    navigationItem = self.reactViewController.navigationItem;
    if ([navigationItem searchController] == _searchController)
        return;
    self.reactViewController.definesPresentationContext = YES;
    _searchController.searchResultsUpdater = self;
    [navigationItem setSearchController:_searchController];
    [navigationItem setHidesSearchBarWhenScrolling:self.hideWhenScrolling];
}

- (void)willMoveToSuperview:(nullable UIView *)newSuperview
{
    [super willMoveToSuperview:newSuperview];
    if (!newSuperview) {
        [navigationItem setSearchController:nil];
        [_searchController.searchResultsController dismissViewControllerAnimated:NO completion:nil];
        navigationItem = nil;
    }
}

- (void)updateSearchResultsForSearchController:(UISearchController *)searchController {
    _nativeEventCount++;
    if (!!self.onChangeText) {
        self.onChangeText(@{
            @"text": searchController.searchBar.text,
            @"eventCount": @(_nativeEventCount),
        });
    }
}

@end
