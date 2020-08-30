package com.smart.ui.common;

import com.smart.ui.common.interceptor.EnvInterceptor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author shizhongming
 * 2020/8/29 2:57 下午
 */
@Configuration
@ComponentScan
@EnableConfigurationProperties(UiCommonProperties.class)
public class SmartUiCommonAutoConfiguration implements WebMvcConfigurer {

    private final UiCommonProperties properties;

    public SmartUiCommonAutoConfiguration(UiCommonProperties properties) {
        this.properties = properties;
    }

    /**
     * 添加环境设置拦截器
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new EnvInterceptor(this.properties.getEnv()));
    }
}
