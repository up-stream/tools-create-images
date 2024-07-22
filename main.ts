import { TextImage } from './text-image';
import { program } from 'commander';

class Main {
  static run() {
    // コマンドライン引数を定義
    program.option('-w, --width <width>', 'width(px)', '1920');
    program.option('-h, --height <height>', 'height(px)', '1080');
    program.option('-f, --from <from>', 'from index', '1');
    program.option('-t, --to <to>', 'to index', '1');

    // コマンドラインパラメータをパース
    program.parse(process.argv);
    const options = program.opts();
    const width = Number(options.width);
    const height = Number(options.height);
    const from = Number(options.from);
    const to = Number(options.to);

    for (let i = from; i <= to; i++) {
      TextImage.create(width, height, i);
    }
  }
}

Main.run();
