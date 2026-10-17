#!/usr/bin/env bash
# 把核心仓库（GitHub/badhope）的状态单向同步到全部镜像。
#
# 主从关系（务必遵守）：
#   核心仓库  = gh-badhope   ← 只允许在这里提交
#   只读镜像  = origin(GitCode) / gh-x33834 / gh-morningstar / gitee
#              ← 禁止在镜像上直接提交，否则五平台 HEAD 必然分叉
#
# 用法：
#   scripts/sync-mirrors.sh              # 常规同步（快进）
#   scripts/sync-mirrors.sh --force      # 镜像已分叉时用（force-with-lease，安全强推）
#
# 频率控制：每推送一个镜像后 sleep 3 秒，避免触发平台限流。
set -uo pipefail
cd "$(dirname "$0")/.."

BRANCH="${BRANCH:-main}"
FLAG=""
[ "${1:-}" = "--force" ] && FLAG="--force-with-lease"
MIRRORS=(origin gh-x33834 gh-morningstar gh-badhope gitee)

echo "本地 HEAD: $(git rev-parse --short HEAD)  分支: $BRANCH  模式: ${FLAG:-快进}"
echo

for r in "${MIRRORS[@]}"; do
    printf '%-16s ' "$r"
    if out=$(timeout 300 git push $FLAG "$r" "$BRANCH" 2>&1); then
        printf 'branch OK  '
    else
        printf 'branch FAIL(%s)  ' "$(echo "$out" | grep -ioE 'authentication failed|invalid username|non-fast-forward|permission denied|unable to access' | head -1)"
    fi
    # 标签：v0.2.1 之后统一同步；v1.0.0 是错误标签，遇到就删
    git push -f "$r" "v$(tr -d '[:space:]' < VERSION)" >/dev/null 2>&1 && printf 'tag OK  ' || printf 'tag FAIL  '
    git push "$r" --delete v1.0.0 >/dev/null 2>&1 && printf 'v1.0.0 removed' || printf 'v1.0.0 n/a'
    echo
    sleep 3
done

echo
echo "--- 同步后各远端 HEAD（应全部一致）---"
for r in "${MIRRORS[@]}"; do
    printf '%-16s %s\n' "$r" "$(timeout 30 git ls-remote "$r" "$BRANCH" 2>/dev/null | head -1 | cut -c1-10)"
done
echo "本地 HEAD:          $(git rev-parse --short HEAD)"
