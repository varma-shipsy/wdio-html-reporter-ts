import fs from 'fs-extra';
import path from 'path';
import {expect} from 'chai';
import {HtmlReporter, ReportGenerator, ReportAggregator} from '../index.js';

let reportAggregator : ReportAggregator;

let htmlReporter  = new HtmlReporter({

    outputDir: './reports/html-reports/',
    filename: 'report.html',
    reportTitle: 'Unit Test Report Title',
    showInBrowser: false,
    browserName: "dummy",
    collapseTests: true,
    useOnAfterCommandForScreenshot: false
});

reportAggregator = new ReportAggregator({
    debug: false,
    outputDir: './reports/html-reports',
    filename: 'master-report.html',
    reportTitle: 'Master Report',
    browserName : "test browser",
    showInBrowser: true,
    collapseTests: false,
    useOnAfterCommandForScreenshot: false
});
reportAggregator.clean();

suite('Suite 1', () => {

    suite('Suite 2', () => {
        test('test 1', async () => {
            console.log('test 1 block');
        });

        test('test 2', async () => {
            console.log('test 2 block');
        });
    });

    suite('Suite 3', () => {
        test('test 3', async () => {
            console.log('test 3 block');
        });

        suite('Suite 4', () => {
            suite('Suite 5', () => {
                test('test 5', async() => {
                    console.log('test 5 block');
                });
            });
        });
    });
});

function after () {
    (async () => {
        await reportAggregator.createReport();
        expect(fs.existsSync(reportAggregator.reportFile)).to.equal(true);
    })();
};

after() ;