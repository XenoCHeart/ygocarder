import { CanvasConst } from 'src/model';

const { height: CanvasHeight, width: CanvasWidth } = CanvasConst;

export const measureWithSymbol = (
    ctx: CanvasRenderingContext2D,
    content: string,
    symbol: string,
    maxWidth: number,
) => {
    const splittedContent = content.split(symbol);
    const splittedWidth = splittedContent.map(entry => ctx.measureText(entry).width);
    const symbolWidth = ctx.measureText(symbol).width;
    const totalCondensableWidth = splittedWidth.reduce((prev, curr) => prev + curr, 0);
    const returnBundle = {
        splittedContent,
        splittedWidth,
        symbolWidth,
        totalCondensableWidth,
        condenseRatio: 1,
    };

    if (totalCondensableWidth > 0) {
        // Calculate as if the "symbol" always appear as full width
        returnBundle.condenseRatio = Math.min((maxWidth - (splittedWidth.length - 1) * symbolWidth) / totalCondensableWidth, 1);
    }

    return returnBundle;
};

/** Nguyên tắc về letterSpacing:
 * * LetterSpacing được tính theo tỷ lệ độ dài chữ cái. Default là 0.
 * * 2 chữ cái liên tiếp nhau có độ dài là x và y, nếu LetterSpacing là 0 thì chúng đứng sát nhau.
 * * Với LetterSpacing =/= 0, mỗi chữ được tăng (giảm) chiều dài bằng một nửa tỷ lệ LetterSpacing, như vậy hai chữ ghép lại sẽ tạo thành
 * tỷ lệ LetterSpacing chuẩn. Ví dụ LetterSpacing là 0.5, thì mỗi chữ sẽ có thêm khoảng cách bằng 50% độ dài con chữ.
 */
export const fillTextLeftWithSpacing = (
    ctx: CanvasRenderingContext2D | null | undefined,
    str: string,
    letterSpacingRatio: number,
    edge: number,
    baseline: number,
) => {
    if (ctx && str) {
        ctx.textAlign = 'left';
        const charList = str.split('');
        let curLeft = edge;

        charList.forEach(char => {
            ctx.fillText(char, curLeft, baseline);
            curLeft += ctx.measureText(char).width * (2 + letterSpacingRatio) / 2;
        });

        return curLeft;
    }
    return 0;
};
export const strokeTextLeftWithSpacing = (
    ctx: CanvasRenderingContext2D | null | undefined,
    str: string,
    letterSpacingRatio: number,
    edge: number,
    baseline: number,
) => {
    if (ctx && str) {
        ctx.textAlign = 'left';
        const charList = str.split('');
        let curLeft = edge;

        charList.forEach(char => {
            ctx.strokeText(char, curLeft, baseline);
            curLeft += ctx.measureText(char).width * (2 + letterSpacingRatio) / 2;
        });

        return curLeft;
    }
    return 0;
};
export const fillTextRightWithSpacing = (
    ctx: CanvasRenderingContext2D | null | undefined,
    str: string,
    letterSpacingRatio: number,
    edge: number,
    baseline: number,
) => {
    if (ctx && str) {
        ctx.textAlign = 'right';
        const charList = str.split('');
        let curRight = edge;

        charList.forEach((c, index) => {
            const char = charList[charList.length - index - 1];
            ctx.fillText(char, curRight, baseline);
            curRight -= ctx.measureText(char).width * (2 + letterSpacingRatio) / 2;
        });
        return curRight;
    };
    return edge;
};

export const fillTextLeftWithLimit = (
    ctx: CanvasRenderingContext2D | null | undefined,
    content: string,
    edge: number,
    baseline: number,
    maxWidth: number,
) => {
    if (ctx) {
        const contentWidth = ctx.measureText(content).width;

        if (contentWidth > 0) {
            const condenseRatio = Math.min(maxWidth / contentWidth, 1);
            ctx.scale(condenseRatio, 1);
            ctx.fillText(content, edge / condenseRatio, baseline);
            ctx.scale(1 / condenseRatio, 1);
            ctx.fillStyle = '#000000';
        }
    }
};

export const clearCanvas = (
    ctx: CanvasRenderingContext2D | null | undefined,
) => {
    if (ctx) {
        ctx.clearRect(0, 0, CanvasWidth, CanvasHeight);
    };
};