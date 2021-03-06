package de.fhg.iais.roberta.syntax.sensor;

import org.junit.Assert;
import org.junit.Test;

import de.fhg.iais.roberta.testutil.Helper;

public class WaitStmtTest {

    @Test
    public void make_ByDefault_ReturnInstanceOfGetSampleSensorClass() throws Exception {
        String expectedResult =
            "BlockAST [project=[[Location [x=113, y=87], MainTask [], WaitStmt [\n"
                + "(repeat [WAIT, Binary [EQ, SensorExpr [MbedGetSampleSensor [BrickSensor [key=BUTTON_A, mode=IS_PRESSED]]], BoolConst [true]]]\n"
                + "AktionStmt [DisplayTextAction [TEXT, StringConst [Hallo]]]\n"
                + ")\n"
                + "(repeat [WAIT, Binary [GT, SensorExpr [MbedGetSampleSensor [TemperatureSensor []]], NumConst [20]]]\n"
                + "AktionStmt [DisplayTextAction [TEXT, StringConst [Hallo]]]\n"
                + ")]]]]";

        String result = Helper.generateTransformerString("/sensor/wait_stmt_two_cases.xml");

        Assert.assertEquals(expectedResult, result);
    }

    @Test
    public void astToBlock_XMLtoJAXBtoASTtoXML_ReturnsSameXML() throws Exception {
        Helper.assertTransformationIsOk("/sensor/wait_stmt_two_cases.xml");
    }

}
