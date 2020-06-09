use neon::prelude::*;
use std::{thread, time};

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    thread::sleep(time::Duration::from_secs(5));
    Ok(cx.string("We are live"))
}

register_module!(mut cx, { cx.export_function("hello", hello) });
