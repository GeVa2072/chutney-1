package com.chutneytesting.campaign.infra.jpa;

import static java.util.stream.Collectors.toSet;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "CAMPAIGN_PARAMETERS")
public class CampaignParameter {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CAMPAIGN_ID")
    private Campaign campaign;

    @Column(name = "PARAMETER")
    private String parameter;

    @Column(name = "PARAMETER_VALUE")
    private String value;

    CampaignParameter() {
    }

    public CampaignParameter(String parameter, String value) {
        this(null, parameter, value);
    }

    public CampaignParameter(Campaign campaign, String parameter, String value) {
        this.campaign = campaign;
        this.parameter = parameter;
        this.value = value;
    }

    public String parameter() {
        return parameter;
    }

    public String value() {
        return value;
    }

    public void forCampaign(Campaign campaign) {
        this.campaign = campaign;
    }

    public static Set<CampaignParameter> fromDomain(com.chutneytesting.server.core.domain.scenario.campaign.Campaign campaign) {
        return campaign.executionParameters.entrySet().stream()
            .map(e -> new CampaignParameter(e.getKey(), e.getValue()))
            .collect(toSet());
    }
}