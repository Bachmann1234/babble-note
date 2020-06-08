use neon::prelude::*;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("We are live"))
}

register_module!(mut cx, {
    cx.export_function("hello", hello)
});
