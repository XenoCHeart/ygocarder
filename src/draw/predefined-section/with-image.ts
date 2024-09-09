
import { CanvasConst } from 'src/model';
import { drawAsset, drawAssetWithSize } from '../image';
import { clearCanvas, setTextStyle } from '../canvas-util';
import { CanvasTextStyle } from 'src/service';

const {
    width: CanvasWidth,
} = CanvasConst;

export const drawStarContent = async ({
    ctx,
    cardIcon,
    text,
    star,
    starAlignment = 'auto',
    style,
    onStarDraw,
}: {
    ctx: CanvasRenderingContext2D | null | undefined,
    cardIcon: string,
    text: string | null,
    star: string | number,
    starAlignment: string,
    style?: CanvasTextStyle,
    onStarDraw: (coordinate: [number, number]) => Promise<void>,
}) => {
    const starWidth = 50;
    const startSpacing = 4;
    let normalizedStarCount = typeof star === 'string'
        ? star === '' ? 0 : 1
        : typeof star === 'number' ? star : 0;
    let totalWidth = starWidth * normalizedStarCount + startSpacing * (normalizedStarCount - 1);
    const baseline = 145;

    let alignment = 'right';
    if (['rank', 'negative-level'].includes(cardIcon)) alignment = 'left';
    alignment = starAlignment === 'auto'
        ? alignment
        : starAlignment;
    if (normalizedStarCount > 12) alignment = 'center';

    if (text && alignment === 'center') {
        normalizedStarCount = 0;
        totalWidth = 0;
    }

    /** Level / Rank 13 is center-aligned. */
    const leftEdge = alignment === 'center'
        ? (CanvasWidth + totalWidth) / 2
        : alignment === 'left'
            ? 85.9125 + totalWidth
            : 728.775;

    let offset = 0 - (starWidth + startSpacing);

    if (ctx && text && cardIcon !== 'st') {
        const fontSize = 50;
        const resetShadow = setTextStyle({ ctx, ...style });
        ctx.textAlign = alignment === 'left' || alignment === 'right'
            ? alignment
            : 'left';
        ctx.font = `bold ${fontSize}px RoGSanSrfStd-Bd`;
        const offset = alignment === 'center'
            ? ctx.measureText(text).width / -2
            : alignment === 'left'
                ? startSpacing
                : (starWidth + startSpacing * 2) * -1;
        ctx.fillText(text, leftEdge + offset, baseline + fontSize * 0.9);
        ctx.textAlign = 'left';
        resetShadow();
    }

    return await Promise.all([...Array(normalizedStarCount)]
        .map(async () => {
            offset += (starWidth + startSpacing);
            let coordinate: [number, number] = [
                leftEdge - (starWidth + offset),
                baseline,
            ];
            await drawAsset(ctx, `subfamily/subfamily-${cardIcon}.png`, ...coordinate);
            return await onStarDraw(coordinate);
        })
    );
};

export const drawSticker = async ({
    ctx,
    sticker,
}: {
    ctx: CanvasRenderingContext2D | null | undefined,
    sticker: string,
}) => {
    if (!clearCanvas(ctx)) return;

    if (sticker === 'no-sticker') return Promise.resolve();
    return drawAsset(ctx, `sticker/sticker-${sticker.toLowerCase()}.png`, 739.1438, 1110.938);
};

/** Duel terminal mark and Speed card mark. They overlap if draw together, so we make them mutually exclusive. Maybe it is not worth the effort. */
export const drawPredefinedMark = async ({
    ctx,
    type,
    isPendulum,
    isLink,
    isDuelTerminalCard,
    isSpeedCard,
    bordered,
}: {
    ctx: CanvasRenderingContext2D | null | undefined,
    type: string,
    isPendulum: boolean,
    isLink: boolean,
    isDuelTerminalCard: boolean,
    isSpeedCard: boolean,
    bordered: boolean,
}) => {
    if (!ctx) return;

    if (isDuelTerminalCard) {
        const coordinate: [number, number, number, number] = isPendulum
            ? [250, 1087, 180, 20]
            : isLink
                ? [151, 848, 216, 24]
                : [80, 843, 270, 30];

        await drawAssetWithSize(ctx, `text/text-duel-terminal-${type}${bordered ? '-bordered' : ''}.png`, ...coordinate);
    }
    if (isSpeedCard) {
        const coordinate: [number, number, number, number] = isPendulum
            ? [250, 1090, 176.4, 18]
            : isLink
                ? [151, 855, 215.6, 22]
                : [80, 850, 245, 25];

        await drawAssetWithSize(ctx, `text/text-speed-duel-${type}${bordered ? '-bordered' : ''}.png`, ...coordinate);
    }
};

export const drawLinkRatingText = async (
    ctx?: CanvasRenderingContext2D | null,
    linkMap?: string[],
) => {
    if (!ctx || !Array.isArray(linkMap)) return;

    await drawAsset(ctx, 'link/link-text.png', 600, 1080);
    ctx.textAlign = 'right';
    ctx.scale(1.2, 1);
    ctx.font = 'bold 26.55px RoGSanSrfStd-Bd';
    ctx.fillStyle = '#000000';
    ctx.fillText(`${linkMap.length}`, 622.75, 1105);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.textAlign = 'left';
};