package com.chutneytesting.action.assertion.placeholder;

import com.chutneytesting.action.spi.injectable.Logger;
import java.text.NumberFormat;
import java.text.ParseException;

public class GreaterThanAsserter implements PlaceholderAsserter {

    private static final String IS_GREATER_THAN = "$isGreaterThan:";
    private static final NumberFormat nb = NumberFormat.getInstance();

    @Override
    public boolean canApply(String value) {
        return value.startsWith(IS_GREATER_THAN);
    }

    @Override
    public boolean assertValue(Logger logger, Object actual, Object expected) {
        String expect = expected.toString().substring(IS_GREATER_THAN.length());
        try {
            Number numActual = nb.parse(actual.toString().replaceAll(" ", ""));
            Number numExpected = nb.parse(expect.replaceAll(" ", ""));
            logger.info("Verify " + numActual.doubleValue() + " > " + numExpected.doubleValue());
            return numActual.doubleValue() > numExpected.doubleValue();
        } catch (ParseException e) {
            logger.error(e.getMessage());
            return false;
        }
    }

}