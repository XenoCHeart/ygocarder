export type TextStyleType = 'auto' | 'custom' | 'predefined';
export type TextStyle = ReturnType<typeof getDefaultTextStyle>;
export const getDefaultTextStyle = () => ({
    fillStyle: '#000000',
    shadowColor: '#000000',
    shadowOffsetY: 0,
    shadowOffsetX: 0,
    shadowBlur: 0,
    hasShadow: false,
    lineColor: '#000000',
    lineWidth: 0,
    lineOffsetY: 0,
    lineOffsetX: 0,
    hasOutline: false,
});

export type CondenseType = 'veryLoose' | 'strict' | 'loose';

export type Card = typeof defaultCard;
export const defaultCard = {
    format: 'tcg',
    frame: 'fusion',
    foil: 'normal',
    name: 'Junko',
    nameStyleType: 'auto' as TextStyleType,
    nameStyle: {
        fillStyle: '#000000',
        shadowColor: '#000000',
        shadowOffsetY: 0,
        shadowOffsetX: 0,
        shadowBlur: 0,
        hasShadow: false,
        lineColor: '#000000',
        lineWidth: 0,
        lineOffsetY: 0,
        lineOffsetX: 0,
        hasOutline: false,
    } as Partial<TextStyle>,
    attribute: 'LIGHT',
    subFamily: 'NO ICON',
    star: 6,
    picture: 'https://i.imgur.com/h5kXZeC.png',
    pictureCrop: {
        x: 0,
        y: 12,
        width: 269,
        height: 269,
        unit: 'px',
        aspect: 1,
    } as Partial<ReactCrop.Crop>,
    linkMap: ['1', '3', '7', '9'] as string[],
    isPendulum: false,
    pendulumEffect: 'Once per turn: You can pay 800 LP, increase this card\'s Pendulum Scale by 1.',
    pendulumScaleRed: '4',
    pendulumScaleBlue: '4',
    typeAbility: ['Fairy', 'Fusion', 'Effect'] as string[],
    effectStyle: {
        condenseTolerant: 'strict' as CondenseType,
    },
    effect: `[2+ Effect Monsters on your field]
Each time an opponent's monster activates its effect, place 1 Pure Counter on that opponent's monster (max. 1) after that effect resolves. Unaffected by activated effects from monster with a Pure Counter. Cannot be destroyed by battle with monsters with a Pure Counter.`,
    setId: 'YGOC-EN001',
    atk: '2000',
    def: '2000',
    passcode: '18111996',
    sticker: 'holo5',
    isFirstEdition: true,
    creator: '©2020 Studio Dice/SHUEISHA TV TOKYO, KONAMI',
};

export const frameType = [
    {name: 'normal', labelColor: '#fff', labelBackgroundColor: '#c49c5e' },
    {name: 'effect', labelColor: '#fff', labelBackgroundColor: '#b96c49' },
    {name: 'fusion', labelColor: '#fff', labelBackgroundColor: '#8948a4' },
    {name: 'synchro', labelColor: '#000', labelBackgroundColor: '#efefef' },
    {name: 'xyz', labelColor: '#fff', labelBackgroundColor: '#000000' },
    {name: 'link', labelColor: '#fff', labelBackgroundColor: '#0c8ac6' },
    {name: 'ritual', labelColor: '#fff', labelBackgroundColor: '#5e85c9' },
    {name: 'spell', labelColor: '#fff', labelBackgroundColor: '#1b8f83' },
    {name: 'trap', labelColor: '#fff', labelBackgroundColor: '#c32a8c' },
    {name: 'token', labelColor: '#fff', labelBackgroundColor: '#6f6c6b' },
    {name: 'dark-synchro', labelColor: '#fff', labelBackgroundColor: '#4d4543' },
    {name: 'obelisk', labelColor: '#fff', labelBackgroundColor: '#515eb0' },
    {name: 'osiris', labelColor: '#fff', labelBackgroundColor: '#bd5044' },
    {name: 'ra', labelColor: '#000', labelBackgroundColor: '#b9ad34' },
    {name: 'hamon', labelColor: '#fff', labelBackgroundColor: '#534a19' },
    {name: 'raviel', labelColor: '#fff', labelBackgroundColor: '#2b344e' },
    {name: 'uria', labelColor: '#fff', labelBackgroundColor: '#623320' },
    {name: 'lg-dragon', labelColor: '#fff', labelBackgroundColor: '#4e84a4' },
    {name: 'speed-skill', labelColor: '#fff', labelBackgroundColor: '#199cd5' },
    {name: 'zarc', labelColor: '#000', labelBackgroundImage: 'linear-gradient(90deg, rgba(185,108,73,1) 23%, rgba(137,72,164,1) 27%, rgba(137,72,164,1) 48%, rgba(239,239,239,1) 52%, rgba(239,239,239,1) 73%, rgba(0,0,0,1) 77%)' },
];

export const iconList = [
    'NO ICON',
    'FIELD',
    'CONTINUOUS',
    'QUICK-PLAY',
    'RITUAL',
    'EQUIP',
    'COUNTER',
];

export const foilStyleMap: Record<string, TextStyle> = {
    gold: {
        fillStyle: '#b88c43',
        shadowColor: '#FCC400',
        shadowOffsetY: 1,
        shadowOffsetX: 0,
        shadowBlur: 1,
        hasShadow: true,
        lineColor: '#000000',
        lineWidth: 0,
        lineOffsetY: 0,
        lineOffsetX: 0,
        hasOutline: false,
    },
    platinum: {
        fillStyle: '#CCCCCC',
        shadowColor: '#FFFFFF',
        shadowOffsetY: 1,
        shadowOffsetX: 0,
        shadowBlur: 1,
        hasShadow: true,
        lineColor: '#000000',
        lineWidth: 0,
        lineOffsetY: 0,
        lineOffsetX: 0,
        hasOutline: false,
    },
};
export const foilList = [
    { name: 'normal', color: '#747b95', textStyle: getDefaultTextStyle() },
    { name: 'gold', color: '#cfa65f' },
    { name: 'platinum', color: '#b1b1b1' },
];

export const stickerList = [
    'no-sticker',
    'gold',
    'silver',
    'beta',
    'holo5',
    'holo4',
    'holo3',
    'holo2',
    'holo1',
    'limited',
    'unlimited',
];

export const NO_ATTRIBUTE = 'NONE';
export const attributeList = [
    { name: NO_ATTRIBUTE, color: '#000000' },
    { name: 'DARK', color: '#b41dda' },
    { name: 'EARTH', color: '#8d8e8e' },
    { name: 'FIRE', color: '#e51b23' },
    { name: 'LIGHT', color: '#bfae32' },
    { name: 'WATER', color: '#008ecd' },
    { name: 'WIND', color: '#28ab35' },
    { name: 'DIVINE', color: '#ef6300' },
    { name: 'SPELL', color: '#1b8f83' },
    { name: 'TRAP', color: '#c32a8c' },
];

export * from './canvas';
export type {
    MasterDuelCanvas
} from './card-seri';
