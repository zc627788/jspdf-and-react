import React, { PureComponent } from 'react';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import faker from 'faker';

export default class pdfGenerator extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  headRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ];
  }

  footRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ];
  }

  columns() {
    return [
      { header: 'ID', dataKey: 'id' },
      { header: 'Name', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'City', dataKey: 'city' },
      { header: 'Exp', dataKey: 'expenses' },
    ];
  }

  data(rowCount) {
    rowCount = rowCount || 10;
    var body = [];
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
      });
    }
    return body;
  }

  bodyRows(rowCount) {
    rowCount = rowCount || 10;
    var body = [];
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: faker.name.findName(),
        email: faker.internet.email(),
        city: faker.address.city(),
        expenses: faker.finance.amount(),
      });
    }
    return body;
  }

  jsPDFGenerator = () => {
    // 实例PDF 第一个参数为 p：纵向 l:横向 第二个参数：测量单位
    var doc = new jsPDF('p', 'px');
    // 纵轴初始化
    let finalY = 0;
    // 纵轴向下平移50px
    finalY += 50;
    doc.saveGraphicsState();
    // 字体大小
    doc.setFontSize(20);
    // 标题
    doc.text('Sales By Venue', 160, finalY);

    finalY += 20;

    // 实例表格
    doc.autoTable({
      startY: finalY,
      // 头部
      head: this.headRows(),
      // 内容
      body: this.bodyRows(10),
    });

    finalY += 200;

    finalY += 30;
    doc.text('Sales By Dispatch Type', 130, finalY);
    finalY += 20;
    doc.autoTable({
      startY: finalY,
      head: this.headRows(),
      body: this.bodyRows(10),
    });
    doc.restoreGraphicsState();
    //在PDF文档中添加新页面，参数如下，也可以不设置，默认a4
    doc.addPage();
    // 保存pdf文档：
    doc.save('generated.pdf');
  };

  render() {
    return <button onClick={this.jsPDFGenerator}>Generate Pdf</button>;
  }
}
