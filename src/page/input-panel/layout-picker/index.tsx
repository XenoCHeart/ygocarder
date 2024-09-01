import { Checkbox, InputNumber, Popover, Slider, Tooltip } from 'antd';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { CompactPicker } from 'react-color';
import { BackgroundType, BackgroundTypeList, CardOpacity, DEFAULT_BASE_FILL_COLOR, OpacityList, getDefaultCardOpacity } from 'src/model';
import styled from 'styled-components';
import { BackgroundInputGroup, BackgroundInputGroupRef } from './background-input-group';
import { ImageCropper } from 'src/component';
import { RadioTrain } from '../input-train';
import { useCard } from 'src/service';
import { useShallow } from 'zustand/react/shallow';
import { BorderOuterOutlined } from '@ant-design/icons';
import './layout-picker.scss';

const StyledLayoutPickerContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: var(--spacing-sm);
    row-gap: var(--spacing-sm);
    padding: 2px 0;
    align-items: center;
    .slider-label,
    .ant-slider,
    .slider-padding {
        border: var(--bw) solid var(--sub-level-1);
        background-color: var(--main-level-4);
    }
    .slider-label {
        display: inline-flex;
        column-gap: var(--spacing-xs);
        border-right: none;
        padding: var(--spacing-xxs) var(--spacing-xs);
        border-radius: var(--br) 0 0 var(--br);
        box-shadow: var(--bs-input);
    }
    .ant-slider {
        margin: 0;
        border-left: none;
        border-right: none;
        height: 28px; // Alignment
        padding-top: 11px; // Alignment
    }
    .slider-padding {
        border-left: none;
        border-radius: 0 var(--br) var(--br) 0;
    }
    .ant-slider-rail,
    .ant-slider-track {
        border-radius: 0 var(--br) var(--br) 0;
    }
    .card-opacity-slider {
        flex: 0 1 auto;
        display: grid;
        grid-template-columns: max-content 60px 45px 12px;
        &.inactive {
            .slider-label,
            .ant-slider,
            .slider-padding {
                background-color: var(--main-level-3);
            }
        }
    }
    .ant-input-number.ant-input-number-sm {
        height: 28px; // Alignment
        width: unset;
        border-radius: 0;
        box-shadow: var(--bs-input);
        .ant-input-number-input {
            height: 26px; // Alignment
        }
    }
    .background-preview {
        display: inline-block;
        line-height: 0;
        width: 17px;
        height: 17px; // Alignment
        align-self: center;
        border: 1px solid #333333;
        cursor: pointer;
        text-align: center;
        user-select: none;
        &:hover {
            box-shadow: 0 0 2px 0 #222222;
        }
        .background-image-preview {
            max-width: 15px;
            max-height: 15px;
        }
        .no-background-icon {
            font-size: 15px; // Alignment
        }
    }
`;
const StyledBaseFillPickerContainer = styled.div`
    &.overlay-no-background-image {
        .card-image-cropper {
            grid-template-columns: 1fr;
        }
        .card-cropper {
            min-height: 0;
            line-height: 0;
            width: 0;
            visibility: hidden;
        }
        .card-image-source-input {
            padding-right: 0;
            margin-right: 0;
            border-right: none;
        }
        i {
            max-width: 247px; // Alignment
        }
    }
    i {
        display: inline-block;
        font-size: var(--fs-sm);
        color: var(--color);
        font-weight: normal;
    }
    .background-picker {
        padding: var(--spacing-xs);
        /** No display none here, again we want to keep card cropper painted, just not visible */
        &.overlay-no-background {
            visibility: hidden;
            height: 0;
            width: 0;
            padding: 0;
        }
    }
    .card-image-source-input {
        padding-right: var(--spacing-xs);
        margin-right: var(--spacing-xs);
        border-right: var(--bw) solid var(--sub-level-4);
        .type-section h2 {
            margin-top: var(--spacing-xs);
        }
        .color-section h2 {
            padding-top: 0;
        }
    }
    .color-section {
        > h2 + div {
            > div:first-child {
                box-shadow: none !important;
            }
            > div:nth-child(2) {
                border: var(--bw) solid var(--main-level-1);
            }
        }
    }
`;

export type LayoutPicker = {
    defaultValue: Partial<CardOpacity>,
    onChange: (opacity: CardOpacity) => void,
} & Pick<ImageCropper, 'receivingCanvas' | 'onTainted' | 'onCropChange' | 'onSourceLoaded'>;
export type OpacityPickerRef = {
    setValue: (opacity: Partial<CardOpacity> & {
        background?: string,
        backgroundCrop?: Partial<ReactCrop.Crop>,
        backgroundType?: BackgroundType,
    }) => void,
};
export const LayoutPicker = forwardRef<OpacityPickerRef, LayoutPicker>(({
    receivingCanvas,
    defaultValue,
    onTainted,
    onChange,
    onSourceLoaded,
    onCropChange,
}, ref) => {
    const {
        hasBackground,
        backgroundType,
        isPendulum,
        background,
        setCard,
        getUpdater,
    } = useCard(useShallow(({
        card: {
            isPendulum,
            hasBackground,
            backgroundType,
            background,
        },
        setCard,
        getUpdater,
    }) => ({
        hasBackground,
        backgroundType,
        isPendulum,
        background,
        setCard,
        getUpdater,
    })));
    const [backgroundInputVisible, setBackgroundInputVisible] = useState(true);
    const [backgroundInputHidden, setBackgroundInputHidden] = useState(true);
    const [opacity, setOpacity] = useState({ ...getDefaultCardOpacity(), ...defaultValue });
    const backgroundInputRef = useRef<BackgroundInputGroupRef>(null);

    const changeBackgroundType = useMemo(() => getUpdater('backgroundType'), [getUpdater]);
    const changeHasBackground = useCallback((e: any) => setCard(currentCard => {
        const nextValue = e.target.checked;

        return { ...currentCard, hasBackground: nextValue };
    }), [setCard]);

    useEffect(() => {
        let relevant = true;
        setTimeout(() => {
            if (relevant) {
                onChange(opacity);
            }
        }, 500);

        return () => {
            relevant = false;
        };
    /** No need to depend on callback */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opacity]);

    useEffect(() => {
        /** Force render, otherwise we will miss the image */
        setBackgroundInputVisible(false);
        /** Avoid consecutive render here, so the popover does not "flashing" when close */
        setTimeout(() => {
            setBackgroundInputHidden(false);
        }, 250);
    }, []);

    useImperativeHandle(ref, () => ({
        setValue: ({ background, backgroundCrop, ...newValue }) => {
            if (typeof background === 'string' && backgroundCrop) {
                backgroundInputRef.current?.setValue({ background, backgroundCrop });
            }
            for (const key in newValue) {
                if (newValue[key as keyof CardOpacity] !== opacity[key as keyof CardOpacity]) {
                    setOpacity(cur => ({ ...cur, ...newValue }));
                }
            }
        }
    }));

    const noBackground = (background ?? '').length === 0;
    return <StyledLayoutPickerContainer className="card-opacity-slider-container">
        <Tooltip
            overlayClassName="long-tooltip-overlay"
            title={<>
                Allow the artwork to extend beyond its border.
                <br />
                Art finish will not apply to boundless artwork.
            </>}
        >
            <Checkbox
                className="art-frame"
                onChange={value => setOpacity(cur => ({ ...cur, boundless: value.target.checked }))}
                checked={opacity.boundless}
            >
                {'Boundless'}
            </Checkbox>
        </Tooltip>
        {OpacityList.map(({ label, type, subType, tooltip }) => {
            if (type === 'pendulum' && !isPendulum) return null;
            const activable = !!subType;
            const isActive = subType && opacity[subType];
            return <div key={type}
                className={[
                    'card-opacity-slider', 
                    isActive ? '' : 'inactive',
                ].join(' ')}
            >
                <div className="slider-label">
                    {type === 'body' && <Popover
                        visible={backgroundInputVisible}
                        destroyTooltipOnHide={false}
                        trigger={['click']}
                        onVisibleChange={setBackgroundInputVisible}
                        overlayClassName={[
                            'input-overlay style-picker-overlay layout-picker-overlay',
                            backgroundInputVisible ? 'picker-visible' : '',
                            backgroundInputHidden ? 'picker-hidden' : '',
                        ].join(' ')}
                        content={<div className="overlay-event-absorber">
                            <StyledBaseFillPickerContainer
                                className={[
                                    'custom-style-picker',
                                    noBackground ? 'overlay-no-background-image' : ''
                                ].join(' ')}
                            >
                                <h3 className={`custom-style-expand ${hasBackground ? '' : 'inactive'}`}>
                                    <Checkbox
                                        checked={hasBackground}
                                        onChange={e => {
                                            changeHasBackground(e);
                                            const activateBackground = e.target.checked;

                                            if (activateBackground) {

                                            }
                                        }}
                                    >Has Background?</Checkbox>
                                    <br />
                                    <i>Define the color and background of the card if you use transparent artwork.</i>
                                </h3>
                                <div className={`background-picker ${hasBackground ? '' : 'overlay-no-background'}`}>
                                    <BackgroundInputGroup
                                        ref={backgroundInputRef}
                                        receivingCanvas={receivingCanvas}
                                        onSourceLoaded={onSourceLoaded}
                                        onTainted={onTainted}
                                        onCropChange={onCropChange}
                                        backgroundColor={opacity.baseFill}
                                    >
                                        <div className="layout-picker-panel">
                                            <div className="layout-picker-subpanel color-section">
                                                <h2>Color</h2>
                                                <CompactPicker
                                                    color={opacity.baseFill}
                                                    onChangeComplete={color => {
                                                        setOpacity(cur => ({ ...cur, baseFill: color.hex }));
                                                    }}
                                                />
                                            </div>
                                            {!noBackground && <div className="layout-picker-subpanel type-section">
                                                <h2>Type</h2>
                                                <RadioTrain
                                                    onChange={changeBackgroundType}
                                                    optionList={BackgroundTypeList}
                                                    value={backgroundType}
                                                />
                                            </div>}
                                        </div>
                                    </BackgroundInputGroup>
                                </div>
                            </StyledBaseFillPickerContainer>
                        </div>}
                        placement="bottom"
                    >
                        <div className="background-preview" style={{ backgroundColor: hasBackground ? opacity.baseFill : DEFAULT_BASE_FILL_COLOR }}>
                            {hasBackground
                                ? background
                                    ? <img className="background-image-preview" src={background} alt="Background" />
                                    : null
                                : <BorderOuterOutlined className="no-background-icon" />}
                        </div>
                    </Popover>}
                    {activable && <Tooltip title={tooltip} overlayClassName="long-tooltip-overlay">
                        <Checkbox
                            checked={isActive}
                            onChange={e => subType && setOpacity(cur => ({ ...cur, [subType]: e.target.checked }))}
                        />
                    </Tooltip>}
                    {label}
                </div>
                <InputNumber
                    size="small"
                    min={0}
                    max={100}
                    onChange={value => setOpacity(cur => ({ ...cur, [type]: typeof value === 'number' ? value : 100 }))}
                    value={opacity[type] ?? 100}
                />
                <Slider
                    min={0}
                    max={100}
                    step={5}
                    onChange={value => setOpacity(cur => ({ ...cur, [type]: value }))}
                    value={opacity[type] ?? 100}
                />
                <div className="slider-padding" />
            </div>;
        })}
    </StyledLayoutPickerContainer>;
});