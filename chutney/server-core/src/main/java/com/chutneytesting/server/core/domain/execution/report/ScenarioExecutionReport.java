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

package com.chutneytesting.server.core.domain.execution.report;

import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.emptySet;

import com.chutneytesting.server.core.domain.dataset.DataSet;
import com.chutneytesting.server.core.domain.tools.Default;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

public class ScenarioExecutionReport {
    public final long executionId;
    public final String scenarioName;
    public final String environment;
    public final String user;
    public final Set<String> tags;
    public final Map<String, Object> contextVariables;
    public final Map<String, String> constants;
    public final List<Map<String, String>> datatable;
    public final StepExecutionReportCore report;

    public ScenarioExecutionReport(long executionId,
                                   String scenarioName,
                                   String environment,
                                   String user,
                                   Collection<String> tags,
                                   DataSet dataSet,
                                   StepExecutionReportCore report) {
        this(executionId,
            scenarioName,
            environment,
            user,
            tags,
            Optional.ofNullable(dataSet).map(ds -> ds.constants).orElse(emptyMap()),
            Optional.ofNullable(dataSet).map(ds -> ds.datatable).orElse(emptyList()),
            report);
    }

    @Default
    @JsonCreator
    public ScenarioExecutionReport(long executionId,
                                   String scenarioName,
                                   String environment,
                                   String user,
                                   Collection<String> tags,
                                   Map<String, String> constants,
                                   List<Map<String, String>> datatable,
                                   StepExecutionReportCore report) {
        this.executionId = executionId;
        this.scenarioName = scenarioName;
        this.environment = environment;
        this.user = user;
        this.tags = Optional.ofNullable(tags).map(Set::copyOf).orElse(emptySet());
        this.contextVariables = searchContextVariables(report);
        this.report = report;
        this.constants = constants;
        this.datatable =datatable;
    }

    public ScenarioExecutionReport(long executionId,
                                   String scenarioName,
                                   String environment,
                                   String user,
                                   Collection<String> tags,
                                   StepExecutionReportCore report) {
       this(executionId, scenarioName,environment,user,tags, null, report);
    }

    private Map<String, Object> searchContextVariables(StepExecutionReportCore report) {
        Map<String, Object> contextVariables = new HashMap<>();
        report.steps.forEach(step -> {
            if (step.steps.isEmpty() && step.stepOutputs != null) {
                contextVariables.putAll(step.stepOutputs);
            } else {
                contextVariables.putAll(searchContextVariables(step));
            }
        });
        return Collections.unmodifiableMap(contextVariables);
    }
}
