import {HtmlReporterOptions, ReportData} from "./types.js";
import logger from '@wdio/logger' ;
import json from 'big-json';
import {String} from 'typescript-string-operations';
import fs from 'fs-extra';
import path from 'node:path';

import url from 'node:url';

class JsonGenerator {
    static LOG = logger('JsonGenerator') ;

    static writeJson(jsonFile:string , stringified:string , reportOptions:HtmlReporterOptions, reportData: ReportData) {
        fs.outputFileSync(jsonFile, stringified);
       JsonGenerator.LOG.info("Json write completed: " + jsonFile );
    }

    static async jsonOutput(reportOptions: HtmlReporterOptions, reportData: ReportData) {

        try {

            if (fs.pathExistsSync(reportOptions.outputDir)) {
                if (reportOptions.removeOutput) {
                    for (let i = 0; i < reportData.suites.length; i++) {
                        let suite = reportData.suites[i];
                        for (let j = 0; j < suite.tests.length; j++) {
                            let test = suite.tests[j];
                            test.output = [];
                        }
                    }
                }

                if (reportOptions.produceJson ) {
                    let jsonFile = reportData.reportFile.replace('.html', '.json');
                   JsonGenerator.LOG.info("Json report write starting: " + jsonFile);
                    try {
                        let stringified = await json.stringify({body: reportData});
                        JsonGenerator.writeJson(jsonFile, stringified, reportOptions, reportData);
                    } catch (error) {
                       JsonGenerator.LOG.error("Json write failed: " + error);
                    }
                } else {
                   JsonGenerator.LOG.info("reportOptions.produceJson is false");
                }
            }
           JsonGenerator.LOG.info("Json Generation Completed");
        } catch (ex) {
           JsonGenerator.LOG.error("Json Generation processing ended in error: " + ex);
        }
    }
}

export default JsonGenerator;