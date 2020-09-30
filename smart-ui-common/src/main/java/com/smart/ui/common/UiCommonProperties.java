package com.smart.ui.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author shizhongming
 * 2020/8/29 3:01 下午
 */
@ConfigurationProperties("smart.ui")
@Getter
@Setter
public class UiCommonProperties {

    private Env env = new Env();

    @Getter
    @Setter
    public static class Env {
        private Boolean development = Boolean.FALSE;

        // 后台地址
        private String apiUrl;
    }

}
