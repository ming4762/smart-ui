package com.smart.ui.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

/**
 * @author shizhongming
 * 2020/8/29 7:47 下午
 */
@RequestMapping("ui/system")
@Controller
public class UiSystemController {

    @RequestMapping("home")
    public ModelAndView home(@RequestParam Map<String, String> parameter) {
        return new ModelAndView("system/home", parameter);
    }
}
