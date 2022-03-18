#!/usr/bin/env bash

if [ -d "/jd" ]; then
  root=/jd
else
  root=/ql
fi

diybot_url="https://github.com/msechen/JD_Diy.git"
jbot_botset=$root/config/bot.json
diybot_repo=$root/repo/diybot
diybot_diy=$root/jbot/diy
diybot_repo_diybotset=$root/repo/diybot/config/diybotset.json
diybot_config_diybotset=$root/config/diybotset.json
diybot_repo_user=$root/repo/diybot/jbot/diy/user.py
diybot_diy_user=$root/jbot/diy/user.py
diybot_repo_diy=$root/repo/diybot/jbot/diy/diy.py
diybot_diy_diy=$root/jbot/diy/diy.py
diybot_repo_hello=$root/repo/diybot/jbot/__main__.py
diybot_diy_hello=$root/jbot/__main__.py
if [ $# = 1 ];then
  up=$1
else
  up=no
fi

git_pull() {
  local dir_current=$(pwd)
  local url=$1
  local dir=$2
  local branch=$3
  [[ $branch ]] && local cmd=origin/${branch}
  cd $dir
  echo "开始更新仓库 $url 到 $dir"
  git fetch --all
  git reset --hard $cmd
  git pull
  cd $dir_current
}

git_clone() {
  local url=$1
  local dir=$2
  local branch=$3
  [[ $branch ]] && local cmd="-b $branch"
  echo "开始克隆仓库 $url 到 $dir"
  git clone $cmd $url $dir
}

diybot() {
  if [ -d $diybot_repo ]; then
    echo "更新 diybot 所需文件"
    git_pull $diybot_url $diybot_repo "main"
  else
    echo "下载 diybot 所需文件"
    git_clone $diybot_url $diybot_repo "main"
  fi
}

fix() {
  zoo_opencard=$(cat $diybot_config_diybotset | grep "zoo_opencard")
  if [ -z "$zoo_opencard" ]
    then echo "请先修改 $diybot_config_diybotset 的内容，再重新启动！参考链接如下"
    echo ""
    echo "https://raw.githubusercontent.com/msechen/JD_Diy/main/config/diybotset.json"
    echo ""
    exit
  fi
  shoptokenId=$(cat $diybot_config_diybotset | grep "shoptokenId")
  if [ -z "$shoptokenId" ]
    then echo "请先修改 $diybot_config_diybotset 的内容，再重新启动！参考链接如下"
    echo ""
    echo "https://raw.githubusercontent.com/msechen/JD_Diy/main/config/diybotset.json"
    echo ""
    exit
  fi
}

file_diybotset() {
  echo "检测 diybotset.json 文件 "
  if [ -f $diybot_config_diybotset ]; then
    echo "  └—结果：存在，不拉取"
  else
    echo "  └—结果：不存在，拉取"
    cp $diybot_repo_diybotset $diybot_config_diybotset
  fi
}

file_user() {
  echo "检测 user.py 文件 "
  if [ -f $diybot_diy_user ]; then
    if [[ $up = user ]]; then
      echo "  └—结果：存在，已选择更新"
      cp -f $diybot_repo_user $diybot_diy_user
    else
      echo "  └—结果：存在，默认不更新"
      rm -f $diybot_repo_user
    fi
  else
    echo "  └—结果：不存在，删除"
    rm -f $diybot_repo_user
  fi
}

file_diy() {
  echo "检测 diy.py 文件 "
  if [ -f $diybot_diy_diy ]; then
    echo "  └—结果：存在，不拉取"
    rm -f $diybot_repo_diy
  else
    echo "  └—结果：不存在，拉取"
    cp -f $diybot_repo_diy $diybot_diy_diy
  fi
}

file_hello() {
  echo "修改启动问候语文件"
  cp -f $diybot_repo_hello $diybot_diy_hello
}

copy() {
  echo "拉取diy机器人文件进入 $root/jbot/diy 目录"
  cp -rf $root/repo/diybot/jbot/diy/* $root/jbot/diy
}

start() {
  if [ -z $(grep -E "123456789" $jbot_botset) ]
    then if [ -d "/jd" ]
      then cd $dir_jbot
        pm2 start ecosystem.config.js
        cd $root
        pm2 restart jbot
      else
        ps -ef | grep "python3 -m jbot" | grep -v grep | awk '{print $1}' | xargs kill -9 2>/dev/null
        nohup python3 -m jbot >$root/log/bot/bot.log 2>&1 &
      fi
  else
    echo "请修改${jbot_botset}的信息后再次手动启动"
  fi
}

main() {
  diybot
  fix
  file_diybotset
  file_user
  file_diy
  file_hello
  copy
  start
}

main
