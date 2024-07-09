/*
 * Copyright 2017-2023 Enedis
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.chutneytesting.engine.domain.execution.report;

import static java.util.Collections.emptyList;

import com.chutneytesting.action.spi.injectable.Target;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class StepExecutionReportBuilder {

    private long executionId;
    private String name;
    private String environment;
    private long duration;
    private Instant startDate;
    private Status status;
    private List<String> information;
    private List<String> errors;
    private List<StepExecutionReport> steps;
    private String type;
    private String targetName = "";
    private String targetUrl = "";
    private String strategy = "sequential";
    private Map<String, Object> evaluatedInputs;
    private Map<String, Object> stepResults;
    private Map<String, String> evaluatedInputsSnapshot;
    private Map<String, String> stepResultsSnapshot;
    private Map<String, Object> scenarioContext;

    public StepExecutionReportBuilder from(StepExecutionReport stepExecutionReport) {
        setExecutionId(stepExecutionReport.executionId);
        setName(stepExecutionReport.name);
        setEnvironment(stepExecutionReport.environment);
        setDuration(stepExecutionReport.duration);
        setStartDate(stepExecutionReport.startDate);
        setStatus(stepExecutionReport.status);
        setInformation(stepExecutionReport.information);
        setErrors(stepExecutionReport.errors);
        setSteps(stepExecutionReport.steps);
        setType(stepExecutionReport.type);
        setTargetName(stepExecutionReport.targetName);
        setTargetUrl(stepExecutionReport.targetUrl);
        setStrategy(stepExecutionReport.strategy);
        setEvaluatedInputs(stepExecutionReport.evaluatedInputs);
        setStepResults(stepExecutionReport.stepResults);
        setScenarioContext(stepExecutionReport.scenarioContext);
        setStepResultsSnapshot(stepExecutionReport.stepResultsSnapshot);
        setEvaluatedInputsSnapshot(stepExecutionReport.evaluatedInputsSnapshot);
        return this;
    }

    public StepExecutionReportBuilder setEvaluatedInputs(Map<String, Object> evaluatedInputs) {
        this.evaluatedInputs = evaluatedInputs;
        return this;
    }

    public StepExecutionReportBuilder setStepResults(Map<String, Object> stepResults) {
        this.stepResults = stepResults;
        return this;
    }

    public StepExecutionReportBuilder setEvaluatedInputsSnapshot(Map<String, String> evaluatedInputsSnapshot) {
        this.evaluatedInputsSnapshot = evaluatedInputsSnapshot;
        return this;
    }

    public StepExecutionReportBuilder setStepResultsSnapshot(Map<String, String> stepResultsSnapshot) {
        this.stepResultsSnapshot = stepResultsSnapshot;
        return this;
    }

    public StepExecutionReportBuilder setScenarioContext(Map<String, Object> scenarioContext) {
        this.scenarioContext = scenarioContext;
        return this;
    }

    private void setExecutionId(long executionId) {
        this.executionId = executionId;
    }

    public StepExecutionReportBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public StepExecutionReportBuilder setEnvironment(String environment) {
        this.environment = environment;
        return this;
    }

    public StepExecutionReportBuilder setDuration(long duration) {
        this.duration = duration;
        return this;
    }

    public StepExecutionReportBuilder setStartDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public StepExecutionReportBuilder setStatus(Status status) {
        this.status = status;
        return this;
    }

    public StepExecutionReportBuilder setInformation(List<String> information) {
        this.information = information;
        return this;
    }

    public StepExecutionReportBuilder setErrors(List<String> errors) {
        this.errors = errors;
        return this;
    }

    public StepExecutionReportBuilder setSteps(List<StepExecutionReport> steps) {
        this.steps = steps;
        return this;
    }

    public StepExecutionReportBuilder setType(String type) {
        this.type = type;
        return this;
    }

    public StepExecutionReportBuilder setTarget(Target target) {
        if (target != null) {
            this.targetName = target.name();
            this.targetUrl = target.rawUri();
        }
        return this;
    }

    public StepExecutionReportBuilder setTargetName(String name) {
        this.targetName = name;
        return this;
    }

    public StepExecutionReportBuilder setTargetUrl(String url) {
        this.targetUrl = url;
        return this;
    }

    public StepExecutionReportBuilder setStrategy(String strategy) {
        if (strategy != null) {
            this.strategy = strategy;
        }
        return this;
    }

    public StepExecutionReport createStepExecutionReport() {
        return new StepExecutionReport(
            executionId,
            name,
            environment,
            duration,
            startDate,
            status,
            Optional.ofNullable(information).orElse(emptyList()),
            Optional.ofNullable(errors).orElse(emptyList()),
            Optional.ofNullable(steps).orElse(emptyList()),
            type,
            targetName,
            targetUrl,
            strategy,
            evaluatedInputs,
            stepResults,
            scenarioContext,
            evaluatedInputsSnapshot,
            stepResultsSnapshot
        );
    }
}
