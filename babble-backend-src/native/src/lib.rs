use neon::prelude::*;
use std::{thread, time};
extern crate migrant_lib;

#[cfg(feature = "d-sqlite")]
use migrant_lib::{Config, Direction, Migrator, Settings};
#[cfg(feature = "d-sqlite")]
use std::env;

#[cfg(feature = "d-sqlite")]
fn prep_db() -> Result<(), Box<dyn std::error::Error>> {
    let path = env::current_dir()?;
    let path = path.join("db/embedded_example.db");
    let settings = Settings::configure_sqlite().database_path(&path)?.build()?;
    let mut config = Config::with_settings(&settings);
    config.setup()?;
    config.use_cli_compatible_tags(true);
    macro_rules! make_migration {
        ($tag:expr) => {
            migrant_lib::EmbeddedMigration::with_tag($tag)
                .up(include_str!(concat!(
                    "../migrations/"
                    $tag,
                    "/up.sql"
                )))
                .down(include_str!(concat!(
                    "../migrations/",
                    $tag,
                    "/down.sql"
                )))
                .boxed()
        };
    }

    config.use_migrations(&[make_migration!("20200615025736_init")])?;

    // Reload config, ping the database for applied migrations
    let config = config.reload()?;

    Migrator::with_config(&config)
        .all(true)
        .show_output(false)
        .swallow_completion(true)
        .apply()?;

    let config = config.reload()?;
    migrant_lib::list(&config)?;
    Ok(())
}
#[cfg(not(feature = "d-sqlite"))]
fn prep_db() -> Result<(), Box<dyn std::error::Error>> {
    Err("d-sqlite database feature required")?;
    Ok(())
}

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    prep_db().unwrap();
    thread::sleep(time::Duration::from_secs(5));
    Ok(cx.string("We are live"))
}

register_module!(mut cx, { cx.export_function("hello", hello) });
