use neon::prelude::*;
use std::{thread, time};
extern crate migrant_lib;

use migrant_lib::{Config, Migrator, Settings};
use std::env;

fn prep_db() -> Result<Config, Box<dyn std::error::Error>> {
    let path = env::current_dir()?;
    let path = path.join("db/embedded_example.db");
    let settings = Settings::configure_sqlite().database_path(&path)?.build()?;
    let mut config = Config::with_settings(&settings);
    config.setup()?;
    config.use_cli_compatible_tags(true);
    macro_rules! make_migration {
        ($tag:expr) => {
            migrant_lib::EmbeddedMigration::with_tag($tag)
                .up(include_str!(concat!("../migrations/", $tag, "/up.sql")))
                .down(include_str!(concat!("../migrations/", $tag, "/down.sql")))
                .boxed()
        };
    }

    config.use_migrations(&[make_migration!("20200615025736_init")])?;

    Migrator::with_config(&config)
        .all(true)
        .show_output(false)
        .swallow_completion(true)
        .apply()?;
    Ok(config)
}

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    prep_db().unwrap();
    thread::sleep(time::Duration::from_secs(5));
    Ok(cx.string("We are live"))
}

register_module!(mut cx, { cx.export_function("hello", hello) });
