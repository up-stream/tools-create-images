import Jimp from 'jimp';
const DIR_NAME = 'output';

export class TextImage {
  /**
   * 画像生成
   * @param width 幅(px)
   * @param height 高さ(px)
   * @param index 通番
   */
  static create(width: number, height: number, index: number) {
    // ディレクトリ生成
    TextImage.createDirectory();
    // 背景色
    const backgroundColor = TextImage.backgroundColor(index);
    // ラベル
    const text = `${width}x${height} No.${index}`;
    // ファイルパス
    const path = this.filePath(width, height, index);
    // 画像ファイル生成
    new Jimp(width, height, backgroundColor, async (error, image: Jimp) => {
      if (error) throw error;

      // テキストを中央に描画
      const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
      image.print(font, 0, 0, {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      }, width, height)

      // 画像をJPG形式で保存
      image.write(path, error => {
        if (error) throw error;
      });
    });
  }

  /**
   * 背景色を生成する
   * @param index 通番
   * @return 背景色
   */
  private static backgroundColor(index: number): string {
    const boundedNumber = index & 0xFFFFFF;
    let x = boundedNumber;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    const transformedNumber = x & 0xFFFFFF;
    return '#' + transformedNumber.toString(16).padStart(6, '0');
  }

  /**
   * ディレクトリを生成する
   */
  private static createDirectory() {
    const fs = require('fs');
    fs.mkdirSync(DIR_NAME, { recursive: true });
  }

  /**
   * ファイルパスを生成する
   * @param width 幅(px)
   * @param height 高さ(px)
   * @param index 通番
   * @returns ファイルパス
   */
  private static filePath(width: number, height: number, index: number): string {
    return `${DIR_NAME}/${width}x${height}_${index.toString().padStart(5, '0')}.jpg`;
  }
}