package com.smart.ui.common.interceptor;

import com.smart.ui.common.UiCommonProperties;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

/**
 * 环境变量拦截器
 * @author shizhongming
 * 2020/8/29 2:58 下午
 */
public class EnvInterceptor implements HandlerInterceptor {

    private final UiCommonProperties.Env env;

    public EnvInterceptor(UiCommonProperties.Env env) {
        this.env = env;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (Objects.nonNull(modelAndView)) {
            modelAndView.getModel().put("env", this.env);
        }
    }
}
