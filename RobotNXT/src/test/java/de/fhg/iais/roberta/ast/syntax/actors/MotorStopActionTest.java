package de.fhg.iais.roberta.ast.syntax.actors;

import org.junit.Test;

import de.fhg.iais.roberta.testutil.Helper;

public class MotorStopActionTest {

    @Test
    public void stopMotor() throws Exception {
        final String a = "\nFloat(OUT_A);";

        Helper.assertCodeIsOk(a, "/ast/actions/action_MotorStop.xml");
    }
}