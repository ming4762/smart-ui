package com.smart.ui.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

/**
 * @author shizhongming
 * 2020/8/29 3:14 下午
 */
@Controller
@RequestMapping("ui/common")
public class CommonWebController {

    @RequestMapping
    public ModelAndView common(@RequestParam Map<String, String> parameter) {
        return new ModelAndView("common/commonPage", parameter);
    }
}
