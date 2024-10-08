import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { CardTextInput, CardTextInputRef } from '../input-text';
import { useCard, useLanguage } from 'src/service';
import { IconButton } from 'src/component';
import { RadioTrain } from '../input-train';
import { CardCheckboxGroup } from '../input-checkbox-group';
import { randomPassword } from 'src/util';
import { SyncOutlined } from '@ant-design/icons';
import { useShallow } from 'zustand/react/shallow';
import { StickerButtonList } from '../const';
import styled from 'styled-components';
import { StyledInputLabelWithButton } from '../input-panel.styled';

const StyledFooterInputContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-sm);
    .checkbox-input {
        align-self: center;
        .ant-checkbox + span {
            user-select: none;
        }
    }
    .sticker-input,
    .creator-input {
        grid-column: span 2;
    }
    .sticker-input .ant-radio-button-wrapper {
        padding-left: var(--spacing-sm);
        padding-right: var(--spacing-sm);
    }
`;

export type FooterInputGroupRef = {
    setValue: (value: { password?: string, creator?: string, atk?: string, def?: string }) => void,
};
export type FooterInputGroup = {
    isMonster: boolean,
    showCreativeOption: boolean,
} & Pick<CardTextInput, 'onTakePicker'>;
export const FooterInputGroup = forwardRef<FooterInputGroupRef, FooterInputGroup>(({
    isMonster,
    showCreativeOption,
    onTakePicker,
}, ref) => {
    const language = useLanguage();
    const {
        sticker,
        getUpdater,
    } = useCard(useShallow(({
        card: { sticker },
        getUpdater,
    }) => ({
        sticker,
        getUpdater,
    })));
    const passwordInputRef = useRef<CardTextInputRef>(null);
    const creatorInputRef = useRef<CardTextInputRef>(null);
    const atkInputRef = useRef<CardTextInputRef>(null);
    const defInputRef = useRef<CardTextInputRef>(null);

    const changeATK = useMemo(() => getUpdater('atk', value => typeof value === 'string' ? value.trim() : value), [getUpdater]);
    const changeDEF = useMemo(() => getUpdater('def', value => typeof value === 'string' ? value.trim() : value), [getUpdater]);
    const changePassword = useMemo(() => getUpdater('password', undefined, 'debounce'), [getUpdater]);
    const onStickerChange = useMemo(() => getUpdater('sticker'), [getUpdater]);
    const changeCreator = useMemo(() => getUpdater('creator', undefined, 'debounce'), [getUpdater]);

    useImperativeHandle(ref, () => ({
        setValue: ({ password, creator, atk, def }) => {
            if (typeof atk === 'string') atkInputRef.current?.setValue(atk);
            if (typeof def === 'string') defInputRef.current?.setValue(def);
            if (typeof password === 'string') passwordInputRef.current?.setValue(password);
            if (typeof creator === 'string') creatorInputRef.current?.setValue(creator);
        }
    }));

    return <StyledFooterInputContainer className="card-footer-input">
        {(isMonster || showCreativeOption) && <>
            <CardTextInput ref={atkInputRef}
                id="atk"
                addonBefore={language['input.atk.label']}
                defaultValue={useCard.getState().card.atk}
                onChange={changeATK}
                onTakePicker={onTakePicker}
            />
            <CardTextInput ref={defInputRef}
                id="def"
                addonBefore={language['input.def.label']}
                defaultValue={useCard.getState().card.def}
                onChange={changeDEF}
                onTakePicker={onTakePicker}
            />
        </>}
        <CardTextInput ref={passwordInputRef}
            id="password"
            addonBefore={<StyledInputLabelWithButton className="input-label-with-button">
                <div className="input-label">{language['input.password.label']}</div>
                <IconButton
                    onClick={() => passwordInputRef.current?.setValue(randomPassword())}
                    Icon={SyncOutlined}
                    tooltipProps={{ overlay: language['button.randomize.label'] }}
                />
            </StyledInputLabelWithButton>}
            defaultValue={useCard.getState().card.password}
            onChange={changePassword}
            onTakePicker={onTakePicker}
        />
        <CardCheckboxGroup />
        <CardTextInput ref={creatorInputRef}
            id="creator"
            addonBefore={language['input.creator-text.label']}
            defaultValue={useCard.getState().card.creator}
            onChange={changeCreator}
            onTakePicker={onTakePicker}
        />
        <RadioTrain
            className="sticker-input fill-input-train"
            value={sticker}
            onChange={onStickerChange}
            optionList={StickerButtonList}
        >
            <span>{language['input.sticker.label']}</span>
        </RadioTrain>
    </StyledFooterInputContainer>;
});