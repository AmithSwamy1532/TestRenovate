import React from 'react';
import OverlayContainer from 'terra-overlay/lib/OverlayContainer';

const LoaderComponent = () => {
    return (<OverlayContainer className={cx('overlay-container')} overlay={this.addLoadingOverlay()}>
        <Button text="Trigger Container Overlay" onClick={this.handleTriggerOverlay} />
        <Button text="Trigger FullScreen Overlay" onClick={this.handleTriggerFullScreenOverlay} />
    </OverlayContainer>);
}

export default LoaderComponent;