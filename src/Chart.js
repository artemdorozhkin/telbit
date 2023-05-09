import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export default class Chart {
  chartJSNodeCanvas;
  configuration;

  constructor(
    labels,
    data,
    month,
    width = 1080,
    height = 920,
    backgroundColour = 'white'
  ) {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({
      width,
      height,
      backgroundColour,
    });

    this.configuration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: month,
            data: data,
            borderColor: ['rgba(161, 0, 219, 0.5)'],
            backgroundColor: ['rgba(161, 0, 219, 0.2)'],
            borderWidth: 2,
          },
        ],
      },
      options: {},
    };
  }

  async getImage(name) {
    const dataUrl = await this.chartJSNodeCanvas.renderToDataURL(
      this.configuration
    );
    const base64Image = dataUrl;

    const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');
    const temp = crypto.randomBytes(4).readUInt32LE(0);
    const filePath = `./reports/${name}${temp}.png`;

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath));
    }

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
      if (err) {
        console.log(err);
      }
    });
    return filePath;
  }
}
