import { createFontGetter } from 'src/util';
import { UP_RATIO } from './canvas';

export type FontSizeData = {
    fontSize: number,
    lineHeight: number,
    lineCount: number,
    offsetY?: number,
    bulletSymbolWidth: number,
    iconSymbolWidth?: number,
    capitalLetterRatio?: number,
    squareBracketRatio?: number,
    largeSymbolRatio?: number,
    letterSpacing?: number,
    wordLetterSpacing?: number,
    overheadFontRatio?: number,
    overheadTextSpacing?: number,
};
export const DefaultFontSizeData = {
    offsetY: 0,
    capitalLetterRatio: 1,
    squareBracketRatio: 1,
    largeSymbolRatio: 1.35,
    letterSpacing: 0,
    overheadFontRatio: 0.325,
    overheadTextSpacing: 0.5,
};
export const DefaultFontData = {
    overheadTextHeightRatio: 0.775,
};

export type MetricMethod = 'name' | 'standard' | 'compact' | 'creator' | 'furigana';
export type FontData = {
    alphabetFont: string,
    font: string,
    fontList: FontSizeData[],
    headTextFillStyle?: string,
    metricMethod?: MetricMethod,
    ordinalFont: string,
    symbolFont: string,
    symbolFontRatio: number,
    numberFont?: string,
    numberFontRatio?: number,
    weight?: string,
    overheadTextHeightRatio?: number
    furiganaFont: string,
};
export type TextData = {
    fontData: FontData,
    fontLevel: number,
    currentFont: ReturnType<typeof createFontGetter>,
};

const commonEffectFontData = {
    symbolFontRatio: 1,
    overheadFontRatio: 0.7,
    overheadTextHeightRatio: 0.825,
    furiganaFont: 'DFHSGothic-W3-WIN-RKSJ-H',
};

export const tcgEffectMonsterFontData: FontData = {
    font: 'MatrixBook',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    fontList: [
        { bulletSymbolWidth: 23, fontSize: 25.2, lineHeight: 24.9, lineCount: 6 },
        { bulletSymbolWidth: 23, fontSize: 19.95, lineHeight: 21.5, lineCount: 7 },
        { bulletSymbolWidth: 23, fontSize: 18.8, lineHeight: 18.8, lineCount: 8 },
        { bulletSymbolWidth: 19, fontSize: 16.7, lineHeight: 16.7, lineCount: 9 },
        { bulletSymbolWidth: 19, fontSize: 15.0, lineHeight: 15.0, lineCount: 10 },
    ]
};
export const ocgEffectMonsterFontData: FontData = {
    font: '"Yu-Gi-Oh! DF Leisho 3"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    metricMethod: 'compact',
    fontList: [
        { bulletSymbolWidth: 16, fontSize: 22.05, lineHeight: 25.8, lineCount: 6, wordLetterSpacing: 0.09 },
    ]
};
export const effectMonsterFontData: Record<string, FontData> = {
    tcg: tcgEffectMonsterFontData,
    ocg: ocgEffectMonsterFontData,
};

export const tcgVanillaMonsterFontData: FontData = {
    font: '"stone-serif-regular"',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    fontList: [
        { bulletSymbolWidth: 23, fontSize: 22.3, lineHeight: 24.9, lineCount: 6 },
        { bulletSymbolWidth: 23, fontSize: 17.68, lineHeight: 21.5, lineCount: 7 },
        { bulletSymbolWidth: 23, fontSize: 16.65, lineHeight: 18.8, lineCount: 8 },
        { bulletSymbolWidth: 19, fontSize: 14.79, lineHeight: 16.7, lineCount: 9 },
        { bulletSymbolWidth: 19, fontSize: 13.29, lineHeight: 15.0, lineCount: 10 },
    ],
};
export const ocgVanillaMonsterFontData: FontData = {
    font: '"Yu-Gi-Oh! DF Leisho 3"',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    metricMethod: 'compact',
    fontList: [
        { bulletSymbolWidth: 16, fontSize: 22.05, lineHeight: 25.8, lineCount: 6, wordLetterSpacing: 0.09 },
    ]
};
export const vanillaMonsterFontData: Record<string, FontData> = {
    tcg: tcgVanillaMonsterFontData,
    ocg: ocgVanillaMonsterFontData,
};

export const tcgPendulumFontList: FontData = {
    font: 'MatrixBook',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    fontList: [
        { bulletSymbolWidth: 23, fontSize: 16.41 * UP_RATIO, lineHeight: 16.44 * UP_RATIO, lineCount: 5 },
    ],
};
export const ocgPendulumFontList: FontData = {
    font: '"Yu-Gi-Oh! DF Leisho 3"',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    metricMethod: 'compact',
    fontList: [
        {
            bulletSymbolWidth: 16,
            fontSize: 22.05,
            lineHeight: 25.2,
            overheadFontRatio: 0.4,
            lineCount: 5,
            wordLetterSpacing: 0.09,
        },
    ],
};
export const pendulumFontList: Record<string, FontData> = {
    tcg: tcgPendulumFontList,
    ocg: ocgPendulumFontList,
};

export const tcgSTFontData: FontData = {
    font: 'MatrixBook',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    fontList: [
        { bulletSymbolWidth: 23, fontSize: 24.38, lineHeight: 24.7, lineCount: 8 },
        { bulletSymbolWidth: 23, fontSize: 19.94, lineHeight: 21.15, lineCount: 10 },
    ],
};
export const tcgSTPendulumFontList: FontData = {
    font: 'MatrixBook',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    fontList: [
        { bulletSymbolWidth: 23, fontSize: 23.26, lineHeight: 24.7, lineCount: 7 },
    ],
};
export const ocgSTFontData: FontData = {
    font: '"Yu-Gi-Oh! DF Leisho 3"',
    symbolFont: 'matrix',
    ...commonEffectFontData,
    ordinalFont: '"DFKakuTaiHiStd-W4"',
    alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
    metricMethod: 'compact',
    fontList: [
        { bulletSymbolWidth: 16, fontSize: 22, lineHeight: 26, lineCount: 7, wordLetterSpacing: 0.09 },
        { bulletSymbolWidth: 16, fontSize: 22, lineHeight: 26, lineCount: 8, wordLetterSpacing: 0.09 },
    ]
};
export const effectSTFontData: Record<string, FontData> = {
    tcg: tcgSTFontData,
    ocg: ocgSTFontData,
    'tcg-pendulum': tcgSTPendulumFontList,
    'ocg-pendulum': ocgSTFontData,
};

/** Speed skill không có dòng ATK / DEF, nhưng lại có dòng type / ability */
export const specialFontData: Record<string, FontData> = {
    normal: {
        font: 'MatrixBook',
        symbolFont: 'matrix',
        ...commonEffectFontData,
        ordinalFont: '"DFKakuTaiHiStd-W4"',
        alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
        fontList: [
            { bulletSymbolWidth: 23, fontSize: 16.41 * UP_RATIO, lineHeight: 16.74 * UP_RATIO, lineCount: 7 },
            { bulletSymbolWidth: 23, fontSize: 13.46 * UP_RATIO, lineHeight: 14.28 * UP_RATIO, lineCount: 8 },
        ]
    },
    pendulum: {
        font: 'MatrixBook',
        symbolFont: 'matrix',
        ...commonEffectFontData,
        ordinalFont: '"DFKakuTaiHiStd-W4"',
        alphabetFont: '"Yu-Gi-Oh! DF Leisho 3"',
        fontList: [
            { bulletSymbolWidth: 23, fontSize: 16.41 * UP_RATIO, lineHeight: 16.74 * UP_RATIO, lineCount: 6 },
            { bulletSymbolWidth: 23, fontSize: 13.46 * UP_RATIO, lineHeight: 14.28 * UP_RATIO, lineCount: 7 },
        ]
    },
};

export type CondenseType = 'veryStrict' | 'veryLoose' | 'strict' | 'loose' | 'relaxed';
export const CondenseTolerantMap: Record<CondenseType, Record<string, number>> = {
    veryStrict: {
        '1': 600,
        '2': 620,
        '3': 640,
    },
    strict: {
        '1': 645,
        '2': 665,
        '3': 685,
    },
    loose: {
        '1': 700,
        '2': 710,
        '3': 720,
    },
    veryLoose: {
        '1': 740,
        '2': 770,
        '3': 800,
    },
    relaxed: {
        '1': 800,
        '2': 850,
        '3': 900,
    },
};
export const CondenseTolerantLabelMap: Record<CondenseType, { label: string, order: number }> = {
    veryStrict: {
        label: '5',
        order: 1,
    },
    strict: {
        label: '4',
        order: 2,
    },
    loose: {
        label: '3',
        order: 3,
    },
    veryLoose: {
        label: '2',
        order: 4,
    },
    relaxed: {
        label: '1',
        order: 5,
    },
};