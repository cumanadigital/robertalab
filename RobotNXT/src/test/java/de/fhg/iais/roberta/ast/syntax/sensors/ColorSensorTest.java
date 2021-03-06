package de.fhg.iais.roberta.ast.syntax.sensors;

import org.junit.Assert;
import org.junit.Test;

import de.fhg.iais.roberta.testutil.Helper;

public class ColorSensorTest {

    @Test
    public void setColor() throws Exception {
        //        final String a = "\nSensorColor(S3,\"COLOR\")SensorColor(S1,\"LIGHT\")SensorColor(S4,\"AMBIENTLIGHT\")";
        //        Helper.assertCodeIsOk(a, "/ast/sensors/sensor_setColor.xml");
        //    }
        String a =
            "BlockAST [project=[[Location [x=-15, y=107], ColorSensor [mode=COLOUR, port=S3]], [Location [x=-13, y=147], ColorSensor [mode=RED, port=S1]],"
                + " [Location [x=-11, y=224], ColorSensor [mode=AMBIENTLIGHT, port=S4]]]]";

        Assert.assertEquals(a, Helper.generateTransformerString("/ast/sensors/sensor_setColor.xml"));
    }
}
